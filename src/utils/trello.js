import Axios from "axios";
// const url = "http://localhost:3000/";
const boardID = "5d39577bfa71106cf2442c63";
const url = "https://api.trello.com/";
const key = "b96742cbd311d72d20ae7a96a10476f2";
const secret =
  "e3dd1fdd405d39f4f031e887f5978e446e8fc29c225f7e0fb72b8233fcb344fb";
const token =
  "8b1b308ad297aa0fca3b77affa81ceb455df1d57c311c889ddc3a6e20ebcec67";

var Trello = {
  async getAllBoard() {
    return await Axios.get(url + "1/members/me?key=" + key + "&token=" + token)
      .then((res) => {
        return res.data.idBoards;
      })
      .catch(() => {
        console.log("Can't get all user trello board.");
      });
  },
  async getBoardDetail() {
    try {
        var temp = {};
        temp = await this.getBoard();
        temp.memberships = await this.getMembership();
        temp.lists = await this.getBoardList();
        for (const i in temp.lists) {
          var allCards = await this.getCards();
          temp.lists[i].items = allCards.filter(
            (card) => card.idList === temp.lists[i].id
          );
        }
        this.getCards();
        sessionStorage.setItem("TrelloBoardDetail",JSON.stringify(temp));
        // console.log(JSON.parse(sessionStorage.getItem("TrelloBoardDetail")))
    } catch (error) {
      console.error(error + "Can't get trello board detail");
    }
  },
  async getBoard() {
    return await Axios.get(
      url + "1/board/" + boardID + "?key=" + key + "&token=" + token
    )
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.error("Can't get board");
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
        token +
        "&member=true"
    )
      .then((res) => {
        var temp = [];
        for (const i in res.data) {
          temp.push(res.data[i].member);
        }
        return temp;
      })
      .catch(() => {
        console.error("Can't get board members");
      });
  },
  async getBoardList() {
    return await Axios.get(
      url + "1/boards/" + boardID + "/lists?key=" + key + "&token=" + token
    )
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.error("Can't get board list");
      });
  },
  async getCards() {
    return await Axios.get(
      url + "1/boards/" + boardID + "/cards?key=" + key + "&token=" + token
    )
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.error("Can't get card");
      });
  },
};

export default Trello;
