import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExamples, deleteExample } from '../redux/examples';

export class AllExamples extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchExamples();
  }

  handleDelete(id) {
    this.props.deleteExample(id);
  }

  render() {
    const examples = this.props.examples;
    if (!examples) return null;
    return (
      <div id="example-list">
        <h1>Examples</h1>
        <ul className="all-examples">
          {examples.map((example) => {
            return (
              <div>
                <li key={example.id}>{example.name}</li>
                <button
                  type="submit"
                  className="deleteButton"
                  onClick={() => this.handleDelete(example.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
        <div id="create-example-button">
          <Link to="/examples/create">Add an example</Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    examples: state.examples,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchExamples: () => dispatch(fetchExamples()),
    deleteExample: (example) => dispatch(deleteExample(example)),
  };
};

export default connect(mapState, mapDispatch)(AllExamples);
