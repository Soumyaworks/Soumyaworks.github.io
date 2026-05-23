const postsList = document.getElementById('posts-list');
const postsCount = document.getElementById('posts-count');
const searchInput = document.getElementById('search-posts');
const tagFilter = document.getElementById('tag-filter');

let posts = [];
let activeSearch = '';
let activeTag = 'all';

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHTML(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getTags(postList) {
  const tags = new Set();
  postList.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return [...tags].sort((a, b) => a.localeCompare(b));
}

function refreshTagFilter() {
  const existing = tagFilter.value;
  const tags = getTags(posts);

  tagFilter.innerHTML = '<option value="all">All tags</option>';
  tags.forEach((tag) => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tagFilter.append(option);
  });

  if (existing === 'all' || tags.includes(existing)) {
    tagFilter.value = existing;
    activeTag = existing;
  } else {
    tagFilter.value = 'all';
    activeTag = 'all';
  }
}

function renderPosts() {
  const filtered = posts
    .filter((post) => {
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      const searchMatch = activeSearch ? haystack.includes(activeSearch) : true;
      const tagMatch = activeTag === 'all' ? true : post.tags.includes(activeTag);
      return searchMatch && tagMatch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  postsList.innerHTML = '';
  postsCount.textContent = `${filtered.length} post${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    postsList.innerHTML = '<p class="empty-state">No posts found for this filter.</p>';
    return;
  }

  filtered.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'post-item';

    const tagMarkup = post.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('');

    article.innerHTML = `
      <div class="post-head">
        <h3><a class="post-title-link" href="${encodeURI(post.url)}">${escapeHTML(post.title)}</a></h3>
      </div>
      <p class="post-meta">${formatDate(post.date)} • ${escapeHTML(post.readTime)}</p>
      <p class="post-excerpt">${escapeHTML(post.excerpt)}</p>
      <div class="post-tags">${tagMarkup}</div>
      <a class="post-open-link" href="${encodeURI(post.url)}">Read full post</a>
    `;

    postsList.append(article);
  });
}

async function loadPosts() {
  try {
    const response = await fetch('data/blog-posts.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to load posts: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid posts format');
    }

    posts = data.map((post) => ({
      title: String(post.title || '').trim(),
      excerpt: String(post.excerpt || '').trim(),
      url: String(post.url || '').trim(),
      date: String(post.date || '').trim(),
      readTime: String(post.readTime || '3 min read').trim(),
      tags: Array.isArray(post.tags)
        ? post.tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean)
        : []
    })).filter((post) => post.title && post.excerpt && post.url && post.date);

    refreshTagFilter();
    renderPosts();
  } catch (error) {
    console.error(error);
    postsList.innerHTML = '<p class="empty-state">Unable to load posts. Check <code>data/blog-posts.json</code>.</p>';
    postsCount.textContent = '0 posts';
  }
}

searchInput.addEventListener('input', () => {
  activeSearch = searchInput.value.trim().toLowerCase();
  renderPosts();
});

tagFilter.addEventListener('change', () => {
  activeTag = tagFilter.value;
  renderPosts();
});

loadPosts();
