import { renderHook, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { server } from './../../mocks/server';
import useFetchData from './useFetchData';

describe("useFetchData Procedure", () => {
    test("should fetch and return data", async () => {

        const { result } = renderHook(()=>useFetchData('/api/users'));

        await waitFor(() => {
            expect(result.current.data).toHaveLength(3);
        });
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        await waitFor(() => {
            expect(result.current.error).toBeNull();
        });

    })

    test('should handle error', async () => {
        server.use(
          rest.get('/api/data', (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
      
        const { result } = renderHook(() => useFetchData('/api/users'));
    
        await waitFor(() => {
            expect(result.current.data).toBeNull();
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        await waitFor(() => {
            expect(result.current.error).toBeDefined();
        });
        
      });
})
