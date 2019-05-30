import React from 'react';
import './AutoCompleteSearch.css'

export default class AutoCompleteSearch extends React.Component {
    constructor (props) {
        super(props);
        this.titles = [
            'Kalimera Ellada',
            'Kwlos Ellada',
            'Kali Ellada',
            'Me skotwse giati thn agapousa',
            'Ena vradi',
            'Ela mikri mou'
        ];
        this.state = {
            songTitles: [],
            searchInputValue: '',
        };
    }

    //Perform a regex search on the titles array comparing with the input value
    onTextChange = (e) => {
        const textValue = e.target.value;
        let songTitles = []
        if (textValue.length > 0) {
            const searchRegex = new RegExp(`^${textValue}`, 'i');
            songTitles = this.titles.sort().filter(v => searchRegex.test(v));
        }
        this.setState(() => ({ songTitles, searchInputValue: textValue}))
    }

    //Gets the current selected song
    songSelected (textValue) {
        this.setState(() => ({
            songTitles: [],
            searchInputValue: textValue,
        }))
    }

    //Show the available matched titles if there is a user input 
    renderSongTitles () {
        const { songTitles } =this.state;
        if (songTitles === 0) {
            return null;
        } else {
            return (
                <ul>
                    {songTitles.map((title) => <li onClick={() => (this.songSelected(title))} key={title}>{title}</li>)}
                </ul>
            )
        }
    }

    render () {
        const { searchInputValue } = this.state;
        return (
            <div className="AutoCompleteSearch">
                <input value={searchInputValue} onChange={this.onTextChange} type="text" />
                {this.renderSongTitles()}
            </div>
        )
    }
}