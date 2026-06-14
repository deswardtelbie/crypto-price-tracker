import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Pre-typed versions of the react-redux hooks — use these throughout the app
// instead of the plain `useDispatch`/`useSelector` to get full type inference.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
