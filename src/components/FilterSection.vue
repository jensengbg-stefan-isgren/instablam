<template>
  <div>
    <section class="filter_section">
      <div class="filter_setting">
        <button class="filter_button" @click="decreaseBrightness">-</button>
        <span class="filter_text">Brightness</span>
        <button class="filter_button" @click="increaseBrightness">+</button>
      </div>

      <div class="filter_setting">
        <button class="filter_button" @click="decreaseHue">-</button>
        <span class="filter_text">Hue</span>
        <button class="filter_button" @click="increaseHue">+</button>
      </div>
      <div class="filter_setting">
        <button class="filter_button" @click="decreaseSepia">-</button>
        <span class="filter_text">Sepia</span>
        <button class="filter_button" @click="increaseSepia">+</button>
      </div>
      <div class="filter_setting">
        <button class="filter_button" @click="decreaseBlur">-</button>
        <span class="filter_text">Blur</span>
        <button class="filter_button" @click="increaseBlur">+</button>
      </div>
      <div class="filter_setting">
        <button class="filter_button" @click="decreaseClip">-</button>
        <span class="filter_text">Clip</span>
        <button class="filter_button" @click="increaseClip">+</button>
      </div>
      <div class="filter_setting">
        <button class="filter_button" @click="decreaseNoise">-</button>
        <span class="filter_text">Noise</span>
        <button class="filter_button" @click="increaseNoise">+</button>
      </div>
    </section>
    <div class="reset_save">
      <button class="reset_filter" @click="resetFilter">Reset filter</button>
      <button @click="downloadImage" class="save_image" ref="downloadLink">Ladda ner</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["capturedImage"])
  },
  methods: {
    downloadImage() {
      const downloadElem = document.createElement("a");
      downloadElem.download = this.capturedImage;
      const image = document.querySelector("img");
      const canvas = document.querySelector("canvas");
      const downloadLink = document.querySelector("a");
      if (canvas) {
        var link = document.createElement("a");
        link.download = "Instablam_Picture.png";
        link.href = document.querySelector("canvas").toDataURL();
        link.click();
      } else {
        downloadElem.href = this.capturedImage;
        downloadElem.click();
      }
    },
    increaseBrightness(event) {
      this.Caman("#photo", function() {
        this.brightness(10);
        this.render();
      });
    },
    decreaseBrightness() {
      this.Caman("#photo", function() {
        this.brightness(-10);
        this.render();
      });
    },
    increaseHue(event) {
      this.Caman("#photo", function() {
        this.hue(10);
        this.render();
      });
    },
    decreaseHue() {
      this.Caman("#photo", function() {
        this.hue(-10);
        this.render();
      });
    },
    increaseSepia(event) {
      this.Caman("#photo", function() {
        this.sepia(10);
        this.render();
      });
    },
    decreaseSepia() {
      this.Caman("#photo", function() {
        this.sepia(-10);
        this.render();
      });
    },
    increaseBlur(event) {
      this.Caman("#photo", function() {
        this.stackBlur(5);
        this.render();
      });
    },
    decreaseBlur(event) {
      this.Caman("#photo", function() {
        this.stackBlur(-5);
        this.render();
      });
    },
    increaseClip(event) {
      this.Caman("#photo", function() {
        this.clip(10);
        this.render();
      });
    },
    decreaseClip(event) {
      this.Caman("#photo", function() {
        this.clip(-10);
        this.render();
      });
    },
    increaseNoise(event) {
      this.Caman("#photo", function() {
        this.noise(10);
        this.render();
      });
    },
    decreaseNoise(event) {
      console.log(event.target.value);
      this.Caman("#photo", function() {
        this.noise(-10);
        this.render();
      });
    },
    resetFilter() {
      this.Caman("#photo", function() {
        this.revert();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.filter_button {
  width: 40px;
  height: 20px;
  border-radius: 2px;
  border: none;
  outline: none;
}

.filter_setting {
  padding: 5px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-auto-rows: auto;
}

.reset_filter {
  width: 50%;
  height: 30px;
  margin-bottom: 10px;
  border: none;
  outline: none;
  border-radius: 2px;
  background-color: #f56476;
  color: white;
}

.save_image {
  width: 50%;
  height: 30px;
  outline: none;
  border: none;
  border-radius: 2px;
  background-color: #70ae6e;
  color: white;
}

.reset_save {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.filter_text {
  font-family: $title;
}
</style>