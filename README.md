## Really Smart
[Really Smart](https://really-smart.herokuapp.com/#/)
<br>
Really Smart is a clone of Genius created by Eddie Kim. The website shows the lyrics of tracks and allows users to annotate parts of the lyrics in order to explain what those parts may actually mean. The technologies used in the development of the website were Ruby on Rails, Node.js, and React-Redux.

## Annotations
There were two major hurdles when it came to implementing the annotations: adding the current annotations directly onto the lyrics text and getting the correct part of the text to be annotated when an annotation is created.
<br>
In order to add the current annotations onto the text, each annotation had data pertaining to the location of the text where the annotation was referring to. The text would then be divided up into different annotated and non-annotated parts in order and then merged into one complete text.
<br>
An annotation can then be created by having the user select a part of the lyrics text to specify which part the user wants to annotate. A constraint that had to be placed is that any of the text that is selected cannot be already part of an annotation. Data would then have to be reorganized and passed from the text that was selected in order to create the correct annotation.
