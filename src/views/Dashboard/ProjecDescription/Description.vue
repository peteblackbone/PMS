<template>
  <v-card class="ma-2 elevation-1" flat>
    <v-toolbar height="56px" flat>
      <v-toolbar-title>Project Descriptions</v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
    </v-toolbar>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="item in projectDesc" :key="item" cols="12">
            <v-row>
              <v-col cols="3" class="d-flex justify-end">{{
                item.title
              }}</v-col>
              <v-col cols="9">
                {{ item.data }}
              </v-col>
            </v-row>
            <v-divider v-show="item.end"></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
  <!-- <div class="grey lighten-5">
    
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      // projectDescTitle: ["ชื่อภาษาไทย","ชื่อภาษาอังกฤษ","สมาชิก","อาจารย์ที่ปรึกษา","บทคัดย่อ"],
      projectDesc: [
        { title: "ชื่อภาษาไทย", data: "ฟหกมฟหกงมฟงหกว" },
        { title: "ชื่อภาษาอังกฤษ", data: "asdasd", end: true },
        { title: "สมาชิก", data: [{ name: "A" }, { name: "b" }] },
        { title: "อาจารย์ที่ปรึกษา", end: true },
        {
          title: "บทคัดย่อ",
          data:
            "โครงงานนี้มีวัตถุประสงค์เพื่อช่วยจัดการ การทำโครงงานแก่นักศึกษาวิศวกรรมคอมพิวเตอร์ มทร.ล้านนาให้เป็นระบบมากยิ่งขึ้น และเป็นแนวทางในการทำโครงงาน เพื่อให้นักศึกษาสามารถส่งงานหรือเอกสารผ่านทางเว็บไซต์ได้ เพื่อจัดเก็บโครงงานของนักศึกษา เพื่อลดพื้นที่ในการเก็บเอกสาร โดยใช้ เว็บไซต์บริหารและจัดการโครงงานวิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เข้ามาเป็นสื่อกลางระหว่างอาจารย์และนักศึกษาในการทำโครงงาน รวมไปถึงระบบสนับสนุนการส่งโครงงานและเอกสารที่เกี่ยวข้องผ่านทางเว็บไซต์ให้กับอาจารย์และนักศึกษาผลที่คาดว่าจะได้รับ นักศึกษาจะได้รู้ว่าการทำโครงงานควรจะเริ่มต้นยังไงและทางเว็บไซต์จะสามารถช่วยบริหารว่า ช่วงเวลาไหนควรส่งเอกสารไหนอีก อีกทั้งยังลดเวลาและลดค่าใช้จ่ายต่าง ๆ และยังสามารถเพิ่มความสะดวกสบายในการทำโครงงานมากยิ่งขึ้น"
        }
      ]
    };
  }
};
</script>

<style></style>
