'use babel';

import SitusGacorSlotView from './situs-gacor-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  situsGacorSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.situsGacorSlotView = new SitusGacorSlotView(state.situsGacorSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.situsGacorSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'situs-gacor-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.situsGacorSlotView.destroy();
  },

  serialize() {
    return {
      situsGacorSlotViewState: this.situsGacorSlotView.serialize()
    };
  },

  toggle() {
    console.log('SitusGacorSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
