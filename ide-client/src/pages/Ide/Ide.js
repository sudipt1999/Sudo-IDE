import React, { Component } from 'react'
import './Ide.css'
import axios from 'axios'
import secret from '../../secrets/secret'

export default class Ide extends Component {
    state={
        code: `
        #include<bits/stdc++.h>
        using namespace std;
        
        int main() {
        cout<<"hello world"<<endl;
        return 0;
        }
        `,
        result: 'Submit Code to See Result',
        lang: 'c++'
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        alert("submit code")
        axios.post(`${secret.url}code/submit`,this.state)
            .then(res=>{
                console.log(res.data)
                const data = res.data
                if(data.err){
                    // Error in user code
                    this.setState({
                        result: data.error
                    })
                }else{
                    this.setState({
                        result: data.output
                    })
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }


    onCodeChangeHandler = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    onInputChangeHandler = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    render() {
       console.log(this.state)
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                        <select id="lang" onChange={(e) => this.setState({ lang: e.target.value })}>
                            <option value="c++">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                             <p className="lead d-block my-0">Code your code here</p>
                             <textarea type="text" id="code" value={this.state.code} onChange={this.onCodeChangeHandler}>
                             </textarea>
                        </div>
                        <div className="col-12 mt-3">
                            <p className="lead d-block my-0">Provide Input</p>
                             <textarea type="text" id="input" value={this.state.input} onChange={this.onInputChangeHandler}>
                             </textarea>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={this.onSubmitHandler}>Submit Code</button>
                    <div className="row">
                        <div className="col-12 my-5">
                             <textarea type="text" id="result" value={this.state.result} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
