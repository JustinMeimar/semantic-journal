import React from "react";

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: {metrics: ["Running speed", "Heart rate", "Distance"]}
        };
    }

    render() {

        return (
            <div className="entryPage">
                <p className="entryHeader">
                    {`Your three metrics are: ${this.state.goal.metrics.join(", ")}`}
                </p>
                <div className="entryDiv">
                    <p htmlFor="otherComments" className="entryHeader">How did today go?</p>
                    <textarea type="text" id="mainEntry" className="entryPrompt" />
                </div>
                <button className="entrySubmitButton">Record</button>
            </div>
        )
    }
}
export default Journal;