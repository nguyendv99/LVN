import React, { Component } from 'react';

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Lesson: []
        })
    }


    render() {
        return (
            <div>
                <h5>Bài đọc: {this.props.LessonTitle}</h5>
                <h6>Thông tin bài đọc:</h6>
                {/* <img src="/logo192.png" alt="logo"/> */}
                <audio style={{ border: '2px', double: '#b1154a', width: '100%' }} controls>
                                                <source src="horse.ogg" type="audio/ogg" />
                                                <source src="/audio/a.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                        </audio>
                {/* <audio style={{ border: '2px', double: '#b1154a', width: '100%' }} controls>
                    <source src="horse.ogg" type="audio/ogg" />
                    <source src={"/audio/a.mp3" + this.props.LessonTranscript} type="audio/mpeg" />
                Your browser does not support the audio element.
                </audio> */}
                <h6>Nội dung bài đọc</h6>
                <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.LessonTranscript}</p>
                <h6>Từ vựng:</h6>
                <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.LessonVocabulary}</p>
                <hr/>
            </div>
        );
    }
}

export default Lesson;