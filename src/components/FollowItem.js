import React, {Component} from 'react';
import '../App.css';

class FollowItem extends Component {

  render() {
    const { id, name } = this.props.follow;
    return (
        <div className={'col-xs-10 col-sm-6 col-lg-4 my-3'}>
            <div className={'card card-discord'}>
                <div className={'card-body'}>
                    <h5 className={'card-title'}>{name}</h5>
                    <button className="btn btn-secondary SpotButton"
                        onClick={this.props.unfollow.bind(this, id)}>
                            Do not notify
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default FollowItem;
