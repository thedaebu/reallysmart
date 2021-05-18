<img src="https://github.com/thedaebu/reallysmart/blob/main/screenshots/reallysmart.png" >
<a href=https://really-smart.herokuapp.com/#/">Really Smart</a>
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
annotateLyrics(lyrics) {
    let annotations = this.props.annotations    
    let sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index ? 1 : -1));

    let lyricsParts = [];
    let currentIndex = 0;
        
    if (!annotations.includes(undefined)) {            
        sortedAnnotations.forEach((annotation, idx) => {             
            let addIndex
            if (idx === 0 && annotation.startIndex !== 0) {
                addIndex = 0
            } else {
                addIndex = sortedAnnotations[idx-1].end_index
            }

            let startIndex = annotation.start_index;
            let endIndex = annotation.end_index;
               
            if (currentIndex === startIndex) {                
                lyricsParts.push(
                    <span 
                        className='is-an-anno' 
                        onClick={() => this.openAnnotation(annotation.id)}                         
                        key={`is-anno-${annotation.id}`}                             
                        id={`is-anno-${annotation.id}`}
                        data-name={`is-anno-${annotation.id}`}
                        data-id={`${annotation.id}`}     
                        >
                        {lyrics.slice(currentIndex, endIndex + 1)}
                    </span>)     
            } else {
                lyricsParts.push(
                    <span 
                        className='not-an-anno'                             
                        key={`not-anno-${idx}`}
                        id={`not-anno-${idx}`}
                        data-add={addIndex}
                        data-name={`not-anno-${idx}`}
                            >
                        {lyrics.slice(currentIndex, startIndex)}
                    </span>)
                lyricsParts.push(
                    <span 
                        className='is-an-anno' 
                        onClick={() => this.openAnnotation(annotation.id)}                             
                        key={`is-anno-${annotation.id}`} 
                        id={`is-anno-${annotation.id}`}                            
                        data-name={`is-anno-${annotation.id}`} 
                        data-id={`${annotation.id}`}
                        >
                        {lyrics.slice(startIndex, endIndex+1)}
                    </span>)
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(
                    <span 
                        className='not-an-anno'                             
                        key={`not-anno-${idx + 1}`}                            
                        id={`not-anno-${idx + 1}`}                            
                        data-add={endIndex}
                        data-name={`not-anno-${idx + 1}`}
                        >
                        {lyrics.slice(endIndex +1, lyrics.length + 1)}
                    </span>)
            }              
            currentIndex = endIndex + 1;
        })
    }
    return lyricsParts;
}
```

An annotation can then be created by having the user select a part of the lyrics text to specify which part the user wants to annotate. The getSelection function was used to retrieve the proper data needed to determine the location of the desired annotation. Constraints had to be placed so that any of the text that is selected cannot be already part of an annotation. 

```js
mouseUp(e) {
    e.preventDefault();
    this.setState({['yCoord']: e.pageY}); 
    this.setState({['annoId']: e.target.dataset.id})
        
    const highlighted = window.getSelection();
    let newIndices;
    let min;
    let max;
     
    if (highlighted.anchorOffset !== highlighted.focusOffset) {
        newIndices = this.makeNewIndices(highlighted);

        if (Math.min(...newIndices) < 0) {
            min = 0;
        } else {
            min = Math.min(...newIndices);
        };          
        max = Math.max(...newIndices);

        this.setState({['startIndex']: min});
        this.setState({['endIndex']: max});  
        this.props.openAnnotationModal({hello: 'hello'})
    }
}
```

Once the selected pieces of text passes the constraints, the indices retrieved from the data taken from the getSelection function would then be reorganized so that the location of the annotation on the text would be in its proper place on the text.

```js
makeNewIndices(highlighted) {
    let anchorName = highlighted.anchorNode.parentNode.dataset.name;
    let focusName = highlighted.focusNode.parentNode.dataset.name;
    let a;
    let b;

    let add = parseInt(highlighted.focusNode.parentNode.dataset.add);

    if (anchorName.includes(`not-anno`) && focusName.includes(`not-anno`) && anchorName === focusName) {
        a = highlighted.anchorOffset + add
        b = highlighted.focusOffset + add
    } 

    if (anchorName.includes(`not-anno-0`)) {
        b -= 1;
    } else {
        a += 1;
    }

    return [a, b];
}
```
<a href="https://www.linkedin.com/in/edkim163/" >LinkedIn</a>