import React, { Component } from 'react';

class Sentences extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h5>Bài học: {this.props.SentencesTitle}</h5>
                        <h6>Đặt câu: </h6>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.Sentences}</p>
                        <h6>Từ vựng</h6>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.SentencesVocabulary}</p>
                        <br />
                        <hr></hr>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sentences;