## Notes 1.2
- Account page
    - User will be able to delete submitted annotations and comments through the account tab.
- Navigation
        - User will be redirected to previously visited page after successful login or registration.

## Notes 1.1
- Account page
        - A user will be able to access the account page through the Account button located at the top menu.
        - In the Profile tab, the user will be able to update their username and password.
        - In the Annotations tab, the user will be able to view all the annotations that they have created.
        - In the Comments tab, the user will be able to view all the comment that they have created.
- Validator implemented to prevent creating annotations with intersecting parts when multiple users are creating annotations using the same section of text simultaneously.
- Websocket implementation for annotation actions:
        - When an annotation is created, the text will automatically update with a highlight when another user is displaying the text.
        - When an annotation is updated, the update will automatically occur for another user if the user had opened up the annotation display.
        - When an annotation is deleted, the text will automatically update without the deleted annotation and the annotation display will close for any user who had the display open.
- Websocket implementation for comment actions:
        - When a comment is created, the comment will automatically be added to the comment display of a track or annotation.
        - When a comment is updated, the comment will automatically update in the comment display for another user.
        - When a comment is deleted, the comment display will automatically be removed in the comment display for another user.