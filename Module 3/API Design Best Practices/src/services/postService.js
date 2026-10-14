
const store = require('../data/postStore');

function listPosts(query = {}) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 2);
  const maxLimit = 100;

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1
  ) {
    const err = new Error('Page and limit must be positive integers');
    err.statusCode = 400;
    err.code = 'INVALID_PAGINATION';
    throw err;
  }

  const safeLimit = Math.min(limit, maxLimit);
  const allPosts = store.getAllPosts();
  const total = allPosts.length;
  const totalPages = Math.ceil(total / safeLimit);
  const start = (page - 1) * safeLimit;
  const posts = allPosts.slice(start, start + safeLimit);

  return {
    posts,
    pagination: {
      page,
      limit: safeLimit,
      total,
      totalPages
    }
  };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  if (
    typeof body.title !== 'string' ||
    !body.title.trim() ||
    typeof body.author !== 'string' ||
    !body.author.trim()
  ) {
    const err = new Error('Title and author are required');
    err.statusCode = 400;
    err.code = 'INVALID_POST';
    throw err;
  }

  return store.createPost({
    title: body.title.trim(),
    author: body.author.trim()
  });
}

function likePost(id) {
  return store.incrementLikes(id);
}

function explode() {
  throw new Error('Internal demo failure');
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};
