<img src="https://github.com/thedaebu/reallysmart/blob/main/screenshots/reallysmart.png" >
<a href="https://really-smart.herokuapp.com/#/">Really Smart</a>
<br>
Really Smart is a clone of Genius created by Eddie Kim. The website shows the lyrics of tracks and allows users to annotate parts of the lyrics in order to explain what those parts may actually mean. The project is dedicated to DMX, who passed away on April 9, 2021.

<img src="https://raw.githubusercontent.com/thedaebu/reallysmart/main/app/assets/gifs/reallysmart.gif" alt="" />

## Technologies
The technologies used in the development of the website were React/Redux for the front end, Ruby on Rails for the back end, and SCSS for HTML stlying.

## Annotations
There were two major hurdles when it came to implementing the annotations: adding the current annotations directly onto the lyrics text and getting the correct part of the text to be annotated when an annotation is created.
<br>
In order to add the current annotations onto the text, each annotation had data pertaining to the location of the text where the annotation was referring to, which were the indices of the text where the annotation was located. The text would then be divided up into different annotated and non-annotated parts in order and then merged into one complete text.

```js
function annotateLyrics(lyrics: string, currentAnnotations: Array<Annotation>) {
    const currentAnnotations: Array<Annotation> = Object.values(annotations);
    if (currentAnnotations.length > 0) {
        const sortedAnnotations: Array<Annotation> = currentAnnotations.sort((a: Annotation, b: Annotation) => (a.start_index - b.start_index));

        const currentLyricsParts: Array<JSX.Element> = [];
        let currentIndex: number = 0;
        sortedAnnotations.forEach((annotation: Annotation, idx: number) => {
            const addIndex: number = idx === 0
                ? 0
                : sortedAnnotations[idx-1].end_index;
            const startIndex: number = annotation.start_index;
            const endIndex: number = annotation.end_index;

            if (currentIndex === startIndex) {
                currentLyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        key={`is-anno-${annotation.id}`}
                        onClick={() => selectAnnotation(annotation)}
                        data-name={`is-anno-${annotation.id}`}
                        data-testid="lyrics__is-annotation"
                    >
                        {lyrics.slice(currentIndex, endIndex + 1)}
                    </span>
                );
            } else {
                currentLyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        key={`not-anno-${idx}`}
                        data-add={addIndex}
                        data-name={`not-anno-${idx}`}
                        data-testid="lyrics__not-annotation"
                    >
                        {lyrics.slice(currentIndex, startIndex)}
                    </span>
                );
                currentLyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        key={`is-anno-${annotation.id}`}
                        onClick={() => selectAnnotation(annotation)}
                        data-name={`is-anno-${annotation.id}`}
                        data-testid="lyrics__is-annotation"
                    >
                        {lyrics.slice(startIndex, endIndex + 1)}
                    </span>
                );
            }
            if (idx === sortedAnnotations.length - 1) {
                currentLyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        key={`not-anno-${idx + 1}`}
                        data-add={endIndex}
                        data-name={`not-anno-${idx + 1}`}
                        data-testid="lyrics__not-annotation"
                    >
                        {lyrics.slice(endIndex + 1, lyrics.length + 1)}
                    </span>
                );
            }
            currentIndex = endIndex + 1;
        });

        setLyricsParts(currentLyricsParts);
    } else {
        setLyricsParts([
            <span
                className="lyrics__not-annotation"
                onMouseUp={handleTextSelect}
                data-add="0"
                data-name={"not-anno-0"}
                data-testid="lyrics__not-annotation"
            >
                {lyrics}
            </span>
        ]);
    }
}
```

An annotation can then be created by having the user select a part of the lyrics text to specify which part the user wants to annotate. The getSelection function was used to retrieve the proper data needed to determine the location of the desired annotation. Constraints had to be placed so that any of the text that is selected cannot be already part of an annotation. 

```js
function handleTextSelect(e: MouseEvent<HTMLElement>) {
    e.preventDefault();

    setLyricsPartHighlightStatus(true);
    setYCoord(e.pageY-(e.pageY % 30)-367);
    const highlighted: Highlighted = window.getSelection();

    if (highlighted && highlighted.anchorOffset !== highlighted.focusOffset) {
        const newIndices: Array<number> = makeNewIndices(highlighted);
        const start: number = newIndices[0] + 1;
        const end: number = newIndices[1] - 1;
        setStartIndex(start);
        setEndIndex(end);
        if (startIndex < endIndex) {
            handleLyricsPartHighlight(start, end, highlighted);
            setAnnotationOpenStatus(true);
        }
    }
}
```

Once the selected pieces of text passes the constraints, the indices retrieved from the data taken from the getSelection function would then be reorganized so that the location of the annotation on the text would be in its proper place on the text.

```js
function makeNewIndices(highlighted: Highlighted) {
    const anchorName: string = highlighted.anchorNode.parentNode.dataset.name;
    const focusName: string = highlighted.focusNode.parentNode.dataset.name;
    const add: number = parseInt(highlighted.focusNode.parentNode.dataset.add);
    let start: number = 0;
    let end: number = 0;

    if (anchorName.includes("not-anno") && anchorName === focusName) {
        const currentStart: number = highlighted.anchorOffset + add;
        const currentEnd: number = highlighted.focusOffset + add;
        start = Math.min(currentStart, currentEnd);
        end = Math.max(currentStart, currentEnd) + 1;
    }

    return [start, end];
}
```
<a href="https://eddie-kim.com/" >Personal Site</a>
<a href="https://www.linkedin.com/in/edkim163/" >LinkedIn</a>