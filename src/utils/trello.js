import Axios from "axios";
const url = "http://localhost:3000/";
const boardID = "5d39577bfa71106cf2442c63";
// const url = 'https://api.trello.com/'
// const boardID = "5b875bdfc9e6246e65659cc4";
const key = "b96742cbd311d72d20ae7a96a10476f2";
const secret =
  "e3dd1fdd405d39f4f031e887f5978e446e8fc29c225f7e0fb72b8233fcb344fb";
const token =
  "407ab6cc37a6d9b51db4c09a3899eb2014191067683a5fcc8fe2459e6777186d";

var Trello = {
  async getAllBoard() {
    return await Axios.get(
      url + "1/members/me?key=" + key + "&token=" + token
    ).then((res) => {
      return res.data.idBoards;
    });
  },
  async getBoardDetail() {
    var temp = {};
    temp = await this.getBoard();
    temp.memberships = await this.getMembership();
    temp.lists = await this.getBoardList()
    for(const i in temp.lists){
        var allCards = await this.getCards(); 
        temp.lists[i].items = allCards.filter(card => card.idList === temp.lists[i].id)
    }
    this.getCards();
    console.log(temp);
    return temp
  },
  async getBoard(){
      return await Axios.get(url + "1/board/" + boardID + "?key=" + key + "&token=" + token).then((res) => {
        return res.data;
      });
  },
  async getMembership() {
    return await Axios.get(
      url +
        "1/boards/" +
        boardID +
        "/memberships?key=" +
        key +
        "&token=" +
        token     //+"&member=true"
    ).then((res) => {
      var temp = [];
      for (const i in res.data) {
        temp.push(res.data[i].member);
      }
      return temp;
    });
  },
  async getBoardList() {
    return await Axios.get(
      url + "1/boards/" + boardID + "/lists?key=" + key + "&token=" + token
    ).then((res) => {
      return res.data;
    });
  },
  async getCards(){
      return await Axios.get(url+"1/boards/" + boardID + "/cards?key=" + key + "&token=" + token).then(res => {
        return res.data
      })
  }
};

export default Trello;