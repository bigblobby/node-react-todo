import React from 'react';
import Api from '../api'

export default class ContactUsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            telephone: '',
            agreeTerms: false,
            success: false,
            errors: {}
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.name === 'agreeTerms' ? target.checked : target.value;

        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, email, telephone, agreeTerms } = this.state;

        Api.contactEnquiry({
            fullName: fullName,
            email: email,
            telephone: telephone,
            agreeTerms: agreeTerms
        }).then(result => {
            this.setState({
                success: result.data.success,
                errors: {}
            })
        }).catch(err => {
            const data = err.response.data;
            this.setState({
                success: data.success,
                errors: data.errors
            })
        })
    };

    render() {
        return (
            <div>
                {
                    !this.state.success ? (
                        <form onSubmit={ this.handleSubmit } noValidate>
                            <div>
                                <label htmlFor="contact-fullName">Fullname *</label>
                                <input type="text" id="contact-fullName" name="fullName" value={ this.state.fullName }
                                       onChange={ this.handleChange } required/>
                                {
                                    this.state.errors.fullName &&
                                    <span style={ { color: 'red' } }>{ this.state.errors.fullName }</span>
                                }
                            </div>
                            <div>
                                <label htmlFor="contact-fullName">Email *</label>
                                <input type="email" id="contact-email" name="email" value={ this.state.email }
                                       onChange={ this.handleChange } required/>
                                {
                                    this.state.errors.email &&
                                    <span style={ { color: 'red' } }>{ this.state.errors.email }</span>
                                }
                            </div>
                            <div>
                                <label htmlFor="contact-fullName">Telephone *</label>
                                <input type="text" id="contact-telephone" name="telephone"
                                       value={ this.state.telephone } onChange={ this.handleChange } required/>
                                {
                                    this.state.errors.telephone &&
                                    <span style={ { color: 'red' } }>{ this.state.errors.telephone }</span>
                                }
                            </div>
                            <div>
                                <label htmlFor="contact-agreeTerms">Agree to the term</label>
                                <input type="checkbox" id="contact-agreeTerms" name="agreeTerms"
                                       value={ this.state.agreeTerms } onChange={ this.handleChange } required/>
                                {
                                    this.state.errors.agreeTerms &&
                                    <span style={ { color: 'red' } }>{ this.state.errors.agreeTerms }</span>
                                }
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                        <p>Thanks for your enquiry.</p>
                    )
                }
            </div>
        );
    }
}
