import React from 'react';
import classes from '../../../css/Profile/ProfileInfo/ProfileStatus.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    onEditMode = () => {
        this.setState( {
            editMode: true
        });
    }

    offEditMode = () => {
        this.setState( {
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                { !this.state.editMode && 
                    <div className={ classes.profile_status }>
                        <span onDoubleClick={ this.onEditMode }>
                            { this.props.status || '–' }
                        </span>
                    </div>
                }
                { this.state.editMode &&
                    <div className={ classes.profile_status__input }>
                        <input 
                            autoFocus={ true } 
                            onBlur={ this.offEditMode } 
                            value={ this.state.status }
                            onChange={ this.onStatusChange } />
                    </div>
                }
            </div>
        );
    }
};

export default ProfileStatus;