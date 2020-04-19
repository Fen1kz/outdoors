import produce from 'immer';

const makeItemFromThing = id => ({
  ...window.thingById[id],
  count: 1
});

export const defaultState = { bucketList: [], totalCount: 0 };

const recalculateTotalCount = (bucketList) => bucketList.reduce((acc, item) => acc + item.count, 0);

export const saveState = state => localStorage.setItem('bucket', JSON.stringify(state));
export const loadState = _ => JSON.parse(localStorage.getItem('bucket')) || defaultState;


export default function bucketAppReducer(state, action) {
  switch (action.type) {
    case 'addItem': {
      const { id } = action.data;
      const newState = {
        bucketList: produce(state.bucketList, draftList => {
          const idx = draftList.findIndex(item => item.id === id);
          if (~idx) {
            draftList[idx].count = +draftList[idx].count + 1;
          } else {
            draftList.push(makeItemFromThing(id))
          }
        }),
        totalCount: +state.totalCount + 1
      };
      saveState(newState);
      return newState;
    }
    case 'removeItem': {
      const { id } = action.data;
      const newState = {
        bucketList: produce(state.bucketList, draftList => {
          const idx = draftList.findIndex(item => item.id === id);
          if (~idx) {
            draftList[idx].count = +draftList[idx].count - 1;
            if (!draftList[idx].count) draftList.splice(idx, 1);
          }
        }),
        totalCount: +state.totalCount - 1
      };
      saveState(newState);
      return newState;
    }
    case 'setItem': {
      const { id, count } = action.data;
      const bucketList = produce(state.bucketList, draftList => {
        const idx = draftList.findIndex(item => item.id === id);
        if (~idx) {
          draftList[idx].count = Math.min(999, +count);
          if (!draftList[idx].count) draftList.splice(idx, 1);
        }
      });
      const newState = {
        bucketList,
        totalCount: recalculateTotalCount(bucketList)
      };
      saveState(newState);
      return newState;
    }
    case 'clearItems': {
      return produce(defaultState, _ => _);
    }
    default:
      return state;
  }
}