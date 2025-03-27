import { updateCache } from "../utilities";
import { useMutation, useQueryClient } from "react-query";
import { deleteRequest, updateRequest } from "../Patient/apis/patientV1";
import { message } from "antd";

export function useRequestUpdate(queryKey) {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(updateRequest, {
    onError: (error, variables, context) => {
      message.error("Error updating request");
    },
    onSuccess: (res, variables, context) => {
      updateCache(queryKey, queryClient, function update(updatedRequests) {
        // const requestIndex = updatedRequests.pages[variables.page].findIndex(
        //   (item) => item._id === variables.id
        // );

        // updatedRequests.pages[variables.page][requestIndex] = {
        //   ...updatedRequests.pages[variables.page][requestIndex],
        //   title: res.data.title,
        //   content: res.data.content,
        //   updatedAt: res.data.updatedAt,
        // };
        const requestIndex = updatedRequests.findIndex(
          (item) => item._id === variables.id
        );

        updatedRequests[requestIndex].isActive = res.data.isActive;
        queryClient.setQueryData(queryKey, updatedRequests);
      });
      updateCache(
        "requestStats",
        queryClient,
        function update(updatedRequests) {
          if (variables.body.isActive) {
            updatedRequests.active += 1;
            updatedRequests.inActive -= 1;
          } else {
            updatedRequests.inActive += 1;
            updatedRequests.active -= 1;
          }
          queryClient.setQueryData("requestStats", updatedRequests);
        }
      );
      message.success("Request updated successfully");
    },
  });

  function updateRequestFn(id, body, page, onError, onSuccess, onSettled) {
    try {
      mutate(
        {
          id,
          body,
          page,
        },
        {
          onError,
          onSuccess,
          onSettled,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return { updateRequestFn, status };
}

export function useRequestDelete(queryKey) {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(deleteRequest, {
    onError: (error, variables, context) => {
      message.error("Error deleting request");
    },
    onSuccess: (res, variables, context) => {
      updateCache(queryKey, queryClient, function update(updatedRequests) {
        // updatedRequests.pages[variables.page] = updatedRequests.pages[
        //   variables.page
        // ].filter((item) => {
        //   return item._id !== variables.id;
        // });
        const request = updatedRequests.find((item) => {
          return item._id === variables.id;
        });
        queryClient.setQueryData(
          queryKey,
          updatedRequests.filter((item) => {
            return item._id !== variables.id;
          })
        );
        updateCache(
          "requestStats",
          queryClient,
          function update(updatedRequests) {
            console.log(request);
            if (request.isActive) {
              updatedRequests.active -= 1;
            } else {
              updatedRequests.inActive -= 1;
            }
            queryClient.setQueryData("requestStats", updatedRequests);
          }
        );
      });

      message.success("Request deleted successfully");
    },
  });

  function deleteRequestFn(id, page, onError, onSuccess, onSettled) {
    try {
      mutate(
        {
          id,
          page,
        },
        {
          onError,
          onSuccess,
          onSettled,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return { deleteRequestFn, status };
}
