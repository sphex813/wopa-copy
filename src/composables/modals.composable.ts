import { ERROR_MODAL } from "@/assets/text-modal-resources";
import type {
  ModalProps,
  ModalResult,
  ModalResultState,
  TextModalData,
} from "@/models/modal-types";
import {
  defineAsyncComponent,
  ref,
  shallowRef,
  type Component,
  type Ref,
  type ShallowRef,
} from "vue";

const modalRef: ShallowRef<Component | null> = shallowRef(null);
const modalDataRef = ref();
let promiseResolve: <V>(value: ModalResult<V>) => void;
const modalMaskRef: Ref<boolean> = ref(false);

export const useModals = () => {
  const closeModal = <V>(state: ModalResultState, data?: V) => {
    modalRef.value = null;
    modalDataRef.value = null;
    promiseResolve({ data, state });
  };

  const openModal = <T, V>(
    component: Component<ModalProps<T>>,
    modalData?: T,
    modalMask = true
  ): Promise<ModalResult<V>> => {
    modalMaskRef.value = modalMask;

    if (modalRef.value) {
      promiseResolve({ data: null, state: "DISMISS" });
    }

    modalDataRef.value = modalData;
    modalRef.value = component;

    return new Promise(
      (resolve) =>
        (promiseResolve = resolve as <V>(value: ModalResult<V>) => void)
    );
  };

  const openTextModal = (textModalData: TextModalData) => {
    const TextModal = defineAsyncComponent(
      () => import("@/components/modals/TextModal.vue")
    );

    openModal(TextModal, textModalData, false);
  };

  const openErrorModal = (text: string, hint: string) => {
    openTextModal({ ...ERROR_MODAL, text, hint });
  };

  return {
    modalRef,
    modalDataRef,
    modalMaskRef,
    openTextModal,
    openErrorModal,
    openModal,
    closeModal,
  };
};
