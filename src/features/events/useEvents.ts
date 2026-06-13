import { useCallback, useEffect, useState } from 'react'
import type { EventsResponse } from './types'

type UseEventsState = {
  data?: EventsResponse
  isLoading: boolean
  error?: Error
}

export function useEvents() {
  const [state, setState] = useState<UseEventsState>({ isLoading: true })

  const loadEvents = useCallback(async (signal?: AbortSignal) => {
    setState((current) => ({ ...current, isLoading: true, error: undefined }))

    try {
      const response = await fetch('/api/eventbrite/events', { signal })

      if (!response.ok) {
        throw new Error('No se pudieron cargar los eventos')
      }

      const data = (await response.json()) as EventsResponse
      setState({ data, isLoading: false })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return

      setState({
        isLoading: false,
        error: error instanceof Error ? error : new Error('No se pudieron cargar los eventos'),
      })
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadEvents(controller.signal)

    return () => controller.abort()
  }, [loadEvents])

  return {
    ...state,
    events: state.data?.events ?? [],
    refetch: () => loadEvents(),
  }
}
