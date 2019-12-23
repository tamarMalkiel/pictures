import React from 'react';
import './PictureGallery.css';
let page = 1;
export default class PictureGallery extends React.Component {
    state = {
        images: [],
        search: "",
        grayscale: false,
        error: false
    }

    componentDidMount() {
        this.getImages();
    }


    getImages = () => {
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`).then(res => {
            res.json().then(images => {
                this.setState({ images, error: false });
                page = page < 10 ? page + 1 : 0;
            }).catch(err => {
                this.setState({ error: true })
            })
        }).catch(err => {
            this.setState({ error: true })

        })
    }

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    onGrayscale = (e) => {
        this.setState({ grayscale: e.target.value === "Grayscale" ? true : false });
    }

    renderImage = (image) => {
        return <div key={image.id} className={"image-container"}>
            <img src={`https://picsum.photos/id/${image.id}/300/300${this.state.grayscale ? "?grayscale" : ""}`} height={300} width={300} />
            <div><b>{image.author}</b></div>
        </div>
    }

    renderAction = () => {
        return (
            <div className={"actions"}>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class={`btn btn-secondary ${this.state.grayscale ? "active" : ""}`}>
                        <input value={"Grayscale"} name={"grayscale"} onChange={this.onGrayscale} type="radio" checked={this.state.grayscale} /> Grayscale
                    </label>
                    <label class={`btn btn-secondary ${!this.state.grayscale ? "active" : ""}`}>
                        <input value={"Normal"} name={"grayscale"} onChange={this.onGrayscale} type="radio" checked={
                            !this.state.grayscale} />  Normal
                    </label>
                </div>
                <button className={"btn btn-secondary"} onClick={this.getImages}>Next Page</button>

            </div>
        )
    }

    render() {
        if (this.state.error) {
            return <div>
                Error occured
            </div>
        }
        return (
            <div>
                {this.renderAction()}
                <div className={"images-container"}>
                    <div class="input-group input-group-sm mb-3 my-input">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>

                            <input class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.search} onChange={(e) => this.handleChangeSearch(e)} />
                        </div>
                    </div>
                    {this.state.images.filter(item => !item.author.search(this.state.search)).map(this.renderImage)}
                </div>
            </div>
        )
    }
}