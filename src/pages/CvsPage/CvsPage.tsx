import { Breadcrumb } from "@components/Breadcrumb";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { createTable } from "@components/Table/Table";
import { TableEntry } from "@constants/table";
import { DELETE_CV, GET_ALL_CVS } from "@graphql/Cv/Cv.queries";
import {
  CvsData,
  DeleteCvInput,
  DeleteCvOutput,
} from "@graphql/Cv/Cv.interface";
import { ICVTable } from "@interfaces/ICV";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { deleteCvCacheUpdate } from "@graphql/Cv/Cv.cache";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";

const head = [
  { columnKey: "name", columnName: "Name", isSortable: true },
  { columnKey: "description", columnName: "Description", isSortable: true },
];

const Table = createTable<ICVTable>();

export const CvsPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data, refetch } = useQuery<CvsData>(GET_ALL_CVS, {
    onCompleted: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { setToastError } = useErrorToast();

  const [deleteCv] = useMutation<DeleteCvOutput, DeleteCvInput>(DELETE_CV, {
    onError: (error) => {
      setToastError(error.message);
    },
  });

  const handleItemDelete = (id: string) => {
    deleteCv({
      variables: { id },
      update: deleteCvCacheUpdate(id),
      optimisticResponse: {
        deleteCv: {
          affected: 1,
        },
      },
    });
  };

  const handleTryAgain = () => {
    refetch();
  };

  return (
    <PageWrapper>
      <PageTop>
        <Breadcrumb
          config={{
            cvs: "Cvs",
          }}
        />
        <PageTopTypography title="CVs" caption="Cvs list" />
      </PageTop>
      <PageBody>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <InlineError
            message="Something went wrong when trying to fetch cvs data"
            tryAgainFn={handleTryAgain}
          />
        ) : (
          data?.cvs && (
            <Table
              onDelete={handleItemDelete}
              head={head}
              items={data.cvs}
              redirectButtonText="CV details"
              deleteButtonText="Delete"
              entryType={TableEntry.CV}
              showNewEntryButton={true}
            />
          )
        )}
      </PageBody>
    </PageWrapper>
  );
};
