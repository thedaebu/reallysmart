<img src="https://github.com/thedaebu/reallysmart/blob/main/screenshots/reallysmart.png" />
<a href="https://reallysmart.onrender.com">Really Smart</a>
<br>
Really Smart is a clone of Genius created by Eddie Kim. The website shows the lyrics of tracks and allows users to annotate parts of the lyrics in order to explain what those parts may actually mean. The project is dedicated to DMX, who passed away on April 9, 2021.
<br>
<a href="https://eddie-kim.com/">Personal Site</a>
<a href="https://www.linkedin.com/in/edkim163/">LinkedIn</a>

## Technologies
The technologies used in the development of the website were React/Redux for the front end, Ruby on Rails for the back end, and SCSS for HTML stlying.

## Notes 1.2
- Account page
        - User will be able to delete submitted annotations and comments through the account tab.
- Navigation
        - User will be redirected to previously visited page after successful login or registration.

## Annotations
Created annotations can be accessed by clicking on the designated text on each track page.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/annotation_open.gif" alt="" />
<br>
Annotations can be created by highlighting unannotated text with the cursor and saving the notes. Created annotations can also be edited or deleted. Each action will update live.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/annotation_actions.gif" alt="" />

## Comments
Comments can be created and are shown for each track and annotation. Created comments can also be edited or deleted.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/comment_actions.gif" alt="" />

## Upvotes
Upvotes can be given for each annotation or comment by clicking on the thumbs up icon.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/vote_actions.gif" alt="" />

## Searches
Tracks can be searched for using the searchbar by their title, artist, or genre.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/searches.gif" alt="" />

## Notifications
Websocket technology has been implemented using Ruby on Rails' Action Cable technology. Notifications are given to users whenever annotations created by them are commented on or when they are mentioned by another user.
<br>
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/notifications.gif" alt="" />

## Account
Account information can be accessed by each user. They may change their username or password. They may also check all the annotations and comments made by them.
<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/public/account_actions.gif" alt="" />
<br>
<br>
<a href="https://eddie-kim.com/">Personal Site</a>
<a href="https://www.linkedin.com/in/edkim163/">LinkedIn</a>