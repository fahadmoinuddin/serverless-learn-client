import React, { Component } from "react";
import { API , Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./Notes.css";

export default class Notes extends Component {
    constructor(props){
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            isDeleting: null,
            note: null,
            content: "",
            attachmentURL: null
        };
    }

    async componentDidMount(){
        try{
            let attachmentURL;
            const note = await this.getNote();
            const { content, attachment } = note;

            if(attachment){
                attachmentURL = await Storage.vault.get(attachment);
            }

            this.setState({
                note,
                content,
                attachmentURL
            });
        }catch(e){
            alert(e);
        }
    }

    getNote(){
        return API.get("notes", `/notes/${this.props.match.params.id}`);
    }

    validateForm(){
        return this.state.content.length > 0;
    }

    formatFilename(str){
        return str.replace(/^\w+-/, "");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        let attachment; 

        event.preventDefault();

        if(this.file && this.file.size > config.MAX_ATTACHMENT_SIZE){
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE} MB.`);
            return;
        }

        this.setState({isLoading: true});

        try{
            if(this.file){
                attachment = await s3Upload(this.file);
                await Storage.vault.remove(this.state.note.attachment);
            }

            await this.saveNote({
                content: this.state.content,
                attachment: attachment || this.state.note.attachment
            });
            this.props.history.push("/");
        }catch(e){
            alert(e);
            this.setState({isLoading: false});
        }
    }

    saveNote(note){
        return API.put("notes", `/notes/${this.props.match.params.id}`, {
            body: note
        })
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if(!confirmed){
            return;
        }

        this.setState({isDeleting: true});

        try{
            await this.deleteNote();
            this.props.history.push("/");
        }catch(e){
            alert(e);
            this.setState({isDeleting: false});
        }
    }

    deleteNote(){
        return API.del("notes", `/notes/${this.props.match.params.id}`);
    }

    render(){
        return(
            <div className="Notes">
                {this.state.note && 
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="content">
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.content}
                                componentClass="textarea" />
                        </FormGroup>
                        {this.state.note.attachment && 
                            <FormGroup controlId="attachment">
                                <ControlLabel>Attachment</ControlLabel>
                                <FormControl.Static>
                                    <a href={this.state.attachmentURL} target="_blank" rel="noopener noreferrer">
                                        {this.formatFilename(this.state.note.attachment)}
                                    </a>
                                </FormControl.Static>
                            </FormGroup>
                        }
                        <FormGroup controlId="file">
                            {!this.state.note.attachment && <ControlLabel>Attachment</ControlLabel>}
                            <FormControl type="file" onChange={this.handleFileChange} />
                        </FormGroup>
                        <LoaderButton
                            block
                            bsSize="large"
                            bsStyle="primary"
                            isLoading={this.state.isLoading}
                            type="submit"
                            disabled={!this.validateForm()}
                            text="Save"
                            loadingText="Saving..." />
                        <LoaderButton
                            block
                            bsSize="large"
                            bsStyle="danger"
                            isLoading={this.state.isDeleting}
                            text="Delete"
                            loadingText="Deleting..."
                            onClick={this.handleDelete} />
                    </form>
                }
            </div>
        );
    }
}