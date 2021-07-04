import React, { Component } from 'react';

class Syllables extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <h5>Bài học: {this.props.SyllableTitle}</h5>
                    <h6>Âm tiết:</h6>
                    <div>
                        <table className="table">
                            <tbody>
                                {
                                    this.props.Syllable.split(",").map((value, index) => {
                                        if ((index + 1) % this.props.num === 0) {
                                            return (
                                                <>
                                                    <td>{value}</td>
                                                    <tr />
                                                </>
                                            );
                                        } else if ((index + 1) % this.props.num === 1) {
                                            return (
                                                <>
                                                    <tr />
                                                    <td>{value}</td>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>{value}</td>
                                            );
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <h6>Từ vựng: </h6>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.SyllableVocabulary}</p>
                    <h6>Ví dụ: </h6>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.SyllableSentences}</p>
                    <br />
                    <hr className=""></hr>

                </div>
            </div>
        );
    }
}

export default Syllables;