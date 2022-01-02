import React, { Component} from 'react';
import * as Sentry from "@sentry/react";

class ErrorBoundary extends Component {

    state = { // state가 error가 아닐때
        error : false,
    };

    componentDidCatch(error, info){ // error : error / info : 어디에서 error 났는지?
        console.log('error!'); // call
        console.log({error, info}); // 어떤 error이고, 어디에서 error가 났는지?

        this.setState({ // error state(어떤 error 상태인지)
            error : true, // error가 true이면
        });

        // sentry로 error 처리 / 명령어 : yarn build / npx serve ./build
        if(process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, {extra : info});
            
        };

    };

    render() {
        if (this.state.error) { // error발생!
            return <h1>Error!</h1>; 
            // h1 tag로 Error message를 보여준다.
        }
        return this.props.children; // User.js를 불러온다는 소리임!(Error날때!)
    };
};

export default ErrorBoundary;