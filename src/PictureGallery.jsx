import React from 'react';
import './PictureGallery.css';
let page = 1;
export default class PictureGallery extends React.Component {
    state = {
        images: [],
        search: "",
        grayscale: "No"
    }

    componentDidMount() {
        this.getImages();
    }


    getImages = () => {
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`).then(res => {
            res.json().then(images => {
                this.setState({ images });
                page = page < 10 ? page + 1 : 0;
                console.log('images', images);
            }).catch(err => {
                console.log('error', err);
            })
        }).catch(err => {
            console.log('error', err);
        })
    }

    renderImage = (image) => {
        return <div key={image.id} className={"image-container"}>
            <img src={`https://picsum.photos/id/${image.id}/300/300${this.state.grayscale === "Yes"?"?grayscale":""}` } height={300} width={300} />
            <b>{image.author}</b>
        </div>
    }

    handleChangeSearch = (e) => {
        this.setState({search: e.target.value});
    }

    onGrayscale = (e) =>{
        this.setState({grayscale: e.target.value});
    }

    render() {
        return (
            <div>
                grayscale: <br/>
                <input value={"Yes"} name={"grayscale"} onChange={this.onGrayscale} type="radio" checked={this.state.grayscale === "Yes"} /> Yes 
                <input value={"No"} name={"grayscale"} onChange={this.onGrayscale} type="radio" checked={this.state.grayscale === "No"} />  No

                <button onClick={this.getImages}>Next Page</button>
                <input value={this.state.search} onChange={(e) => this.handleChangeSearch(e)} />
                {this.state.images.filter(item=> !item.author.search(this.state.search)).map(this.renderImage)}
            </div>
        )
    }
}