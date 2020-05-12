const LATEST_POSTS_URL = "https://buttercup-island.glitch.me/latest";
const posts = document.getElementById('posts');

fetch(LATEST_POSTS_URL)
  .then(res => res.json())
  .then(addPosts);


function addPosts({topic_list : {topics}, users}) {
  console.log(topics, users)
  const baseUrl = 'https://www.freecodecamp.org/forum'
  const threadUrl = 'https://www.freecodecamp.org/forum/t/'
  const userUrl = 'https://www.freecodecamp.org/forum/u/'

  let row = '';

  topics.forEach((post, index) => {
    let date = new Date(new Date() - new Date(post.bumped_at));
    let activity = date.getHours() > 0 ? `${date.getHours()}h` : `${date.getMinutes()}m`;

    posters = getPosters(post.posters, users);
    let avatars = '';
    posters.forEach(poster => {
      poster.avatar_template = poster.avatar_template.replace('{size}', '135');
      avatars += `<a href="${userUrl + poster.username}"><img src="${baseUrl + poster.avatar_template}" /></a>`
    });

    row += `<ul class="topic">
                <li class="number">${index + 1}</li>
                <li class="title">
                  <a href="${threadUrl + post.slug}/${post.id}">${post.title}</a>
                </li>
                <li class="avatars">${avatars}</li>
                <li class="replies">${post.reply_count}</li>
                <li class="views">${post.views}</li>
                <li class="activity">${activity}</li>
               </ul>`;
  });

  posts.innerHTML = row;


}


function getPosters(posters, users) {
  let posterIds = posters.map(poster => {
    return poster.user_id;
  });

  return users.filter(user => posterIds.includes(user.id));
}