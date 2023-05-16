import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3 white'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className=' form  center pa3 br3 shadow-5'>
                    <input className='f4 pa2 br3 w-70 center' type='text' onChange={onInputChange} />
                    <button 
                        className='w-30 grow f4 link br3 ph5 pv2 dib white bg-light-blue'
                        onClick={onButtonSubmit}
                        >Detect</button>
                </div>
            </div>
        </div>

    )
}

export default ImageLinkForm;