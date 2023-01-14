const dummy = (blogs) => {
	if (blogs.length === 0) {
		return 1;
	}
	return blogs.length;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};

	return blogs.array === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	const reducer = (prev, current) => {
		return prev.likes > current.likes ? prev : current;
	};
	const result = blogs.reduce(reducer);
	delete result._id;
	delete result.url;
	delete result.__v;
	return result;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
