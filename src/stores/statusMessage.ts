import { defineStore } from 'pinia';
import { ref } from 'vue';

export const statusMessage = {
  validation: {
    BLANK: '',
    INVALID: 'I don\'t think that\'s right...',
    VALID: 'Yes! That\'s what i want to see!',
  },
};

export const useStatusMessageStore = defineStore('statusMessage', () => {
  const levelValidationStatus = ref(statusMessage.validation.BLANK);

  const clearGameStatus = () => {
    levelValidationStatus.value = statusMessage.validation.BLANK;
  };

  return { levelValidationStatus, clearGameStatus };
},
);
