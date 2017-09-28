class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) throw new Error('Finite state mashine can\'t work without config');
      this.configTemp = config;
      this.state = [this.configTemp.initial];
      this.history = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state[this.state.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.configTemp.states[state]) {
        this.state.push(state);
        this.history.length = 0;
      }else throw new Error('State not found');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let state = this.getState();
      if (this.configTemp.states[state].transitions[event]) {
        this.state.push(this.configTemp.states[state].transitions[event]);
        this.history.length = 0;
      } else throw new Error('Unknown event in current state');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = [this.configTemp.initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let states = [];
      for (let item in this.configTemp.states) {
        if (!event ||(event && event in this.configTemp.states[item].transitions)) states.push(item);
      }
      return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      return this.state.length !== 1 ? (this.history.push(this.state.pop()), true) : false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      let remove = this.history.pop();
      return remove ? (this.state.push(remove), true) : false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.state = [this.configTemp.initial];
      this.history.length = 0;
    }
}
module.exports = FSM;

/** @Created by Uladzimir Halushka **/
