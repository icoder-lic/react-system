import React, { Component } from 'react';
import SecondUnit from "./SecondUnit";

export default class SecondStep extends Component {
    constructor() {
        super();
    }
    render() {
        return <div>
            <input type="file" ref="myfilectrl" hidden multiple />

            <SecondUnit album="inner" title="室内图"></SecondUnit>
            <SecondUnit album="layouts" title="户型图"></SecondUnit>
            <SecondUnit album="real" title="实景"></SecondUnit>
            <SecondUnit album="other" title="其他"></SecondUnit>
        </div>
    }
}