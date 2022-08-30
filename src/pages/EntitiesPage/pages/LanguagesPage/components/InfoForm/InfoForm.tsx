import { StyledDialogActions } from "@components/styled/StyledDialogActions";
import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { useForm } from "react-hook-form";
import { InfoFormProps, LanguageInput } from "./InfoForm.types";
import { useLayoutEffect } from "react";
import { Button } from "@mui/material";

export const InfoForm = ({ input, onSubmit, onCancel }: InfoFormProps) => {
  const { control, handleSubmit, reset } = useForm<LanguageInput>({
    defaultValues: {
      name: input.name,
      iso2: input.iso2,
    },
  });

  useLayoutEffect(() => {
    const { name, iso2 } = input;

    reset({ name, iso2 });
  }, [input, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoFormWrapper>
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="Name"
            name="name"
          />
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="iso2"
            name="iso2"
          />
        </InfoFormWrapper>

        <StyledDialogActions>
          <Button type="submit" value="Save" variant="contained">
            Save
          </Button>
          <Button
            onClick={onCancel}
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
          >
            Cancel
          </Button>
        </StyledDialogActions>
      </form>
    </>
  );
};
