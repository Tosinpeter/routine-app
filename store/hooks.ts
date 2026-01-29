import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./index";

/**
 * Typed version of useDispatch hook
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed version of useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
