import React from 'react';

function Person({name}: {name:string}) {

    return (
        <div role="contentinfo">
            Name is {name}.
        </div>
    )
}
export default Person;