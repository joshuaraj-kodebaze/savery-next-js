import { useStore } from 'react-redux'
import type { AppStore } from '@/redux/store'

export const useAppStore = useStore.withTypes<AppStore>()