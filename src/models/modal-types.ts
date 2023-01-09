export type ModalEmits<T> = {
  (e: "close", result?: T): void;
  (e: "dismiss"): void;
};

export type ModalProps<T> = {
  modalData?: T;
};

export type ModalResult<T> = {
  data?: T;
  state: ModalResultState;
};

export type ModalResultState = "DISMISS" | "CLOSE";

export type TextModalData = {
  title: string;
  text: string;
  hint?: string;
  confirmButtonText: string;
  cancelButtonText?: string;
};
