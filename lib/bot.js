const {
	getAccountId,
	followUser,
	unfollowUser,
	getFollowersAndFollowing,
	getRelationships
} = require('./mastodon');

function filterFollows(ids) {
	return getRelationships(ids).then(accounts => {
		return accounts.filter(account => {
			return account.followed_by &&
				!account.muting &&
				!account.requested &&
				!account.following
		}).map(a => a.id);
	});
}

function updateRelationships() {
	console.log('Handling new and old followers');
	return getAccountId().then(accountId => {
		return getFollowersAndFollowing(accountId).then(({followerIds, followingIds}) => {
			const usersToFollow = followerIds.filter(userId => !followingIds.includes(userId));
			const followFilterPromise = filterFollows(usersToFollow);

			const usersToFollowPromise = followFilterPromise.then(userIdToFollow =>
				Promise.all(userIdToFollow.map(userId => followUser(userId)))
			);

			const usersToUnfollow = followingIds.filter(userId => !followerIds.includes(userId));
			const usersToUnfollowPromise = Promise.all(
				usersToUnfollow.map(followingId => unfollowUser(followingId))
			);

			return Promise.all([usersToFollowPromise, usersToUnfollowPromise]).then(results => {
				const [followedUsers, unfollowedUsers] = results;
				return {followedUsers, unfollowedUsers};
			});
		});
	});
}

module.exports = {
	updateRelationships
};
