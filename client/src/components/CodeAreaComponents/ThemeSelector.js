import React from 'react';

const themeSelector = (props) => {
    return (
        <div className="form-group">
        <select name="themes" className="form-control selecting" onChange={(e) => {props.change(e.target.value)}}>
            <option value="ambiance" defaultValue >Ambiance</option>
            <option value="material">Material</option>
            <option value="eclipse">Eclipse</option>
            <option value="twilight">Twilight</option>
            <option value="gruvbox-dark">Gruvbox-dark</option>
            <option value="elegant">Elegant</option>
            <option value="base16-dark">Base16-dark</option>
            <option value="base16-light">Base16-light</option>
            <option value="ttcn">Ttcn</option>
            <option value="xq-light">Xq-light</option>
            <option value="xq-dark">Xq-dark</option>
        </select>
        </div>
    );
}; 

export default themeSelector;