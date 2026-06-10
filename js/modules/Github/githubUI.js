const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const locationElement = document.getElementById("location");
const profileLink = document.getElementById("profileLink");

const profileContainer =
  document.getElementById("profileContainer");

const repoContainer =
  document.getElementById("repoContainer");

const languageContainer =
  document.getElementById("languageContainer");

export function displayUser(user) {

  profileContainer.classList.remove("hidden");

  avatar.src = user.avatar_url;

  nameElement.textContent =
    user.name || user.login;

  bio.textContent =
    user.bio || "No bio available";

  followers.textContent =
    user.followers;

  following.textContent =
    user.following;

  repos.textContent =
    user.public_repos;

  locationElement.textContent =
    user.location || "Not Available";

  profileLink.href =
    user.html_url;
}

