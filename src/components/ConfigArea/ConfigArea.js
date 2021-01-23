import {React, useState} from 'react';

const ConfigArea = ({changeData, generatePost})  => {
    const types = [
        {
            website: 'facebook',
            label: 'Facebook',
            background: {
                image: '/assets/background_image/facebook_vertical.png',
                    width: 800,
                    height:1000
            }
        },
        {
            website: 'instagram',
            label: 'Instagram',
            background: {
                image: '/assets/background_image/instagram.png',
                    width: 1080,
                    height:1080
            }
        }
    ]

    const renderPostTypes = () => {
        let itemList = types.map(el =>
            <li>
                <input
                    type="radio"
                    id={`radioPostId-${el.website}`}
                    name="postTypeRadios"
                    onChange={() => changeData('background', el.background)}
                />
                <label htmlFor={`radioPostId-${el.website}`}>{el.label}</label>
            </li>
        )

        return (
            <ul>
                {itemList}
            </ul>
        )
    };


    return (
        <div className="config-area">
            {renderPostTypes()}
            <input type="text" placeholder="Miasto" onChange={event => changeData('city',event.target.value)} required/>
            <input type="text" placeholder="Moc instalacji" onChange={event => changeData('power',event.target.value)} required/>
            <input type="file" onChange={event => changeData('image',URL.createObjectURL(event.target.files[0]))}/>
            <button onClick={() => generatePost()}>Generuj</button>
        </div>
    );
}

export default ConfigArea;
