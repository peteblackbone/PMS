import Axios from "axios";
const url = "http://localhost:3000/";
const boardID = "";
// const url = 'https://api.trello.com/'
const key = "";
const secret =
  "";
const token =
  "";

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
