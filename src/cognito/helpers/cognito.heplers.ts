/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AttributeCognitoNormalizedType,
  AttributesCognitoType,
  PartialAttributeCognitoNormalizedType
} from "../services";

export const attributesToStandard = (attributes: AttributesCognitoType[]) => {
  //   const normalizedAttributes = attributes.find
  const emailAttributeValue = attributes.find(
    (value) => value.Name === "email"
  )!;
  const subAttributeValue = attributes.find((value) => value.Name === "sub")!;
  const emailAttributeVerified = attributes.find(
    (value) => value.Name === "email_verified"
  )!;
  const normalizedEmailAttributes = {
    name: emailAttributeValue.Name,
    value: emailAttributeValue.Value!,
    isVerified: emailAttributeVerified.Value! === "True"
  };

  const normalizedSubAttributes = {
    name: subAttributeValue.Name,
    value: subAttributeValue.Value!,
    isVerified: false
  };

  console.log(normalizedSubAttributes);

  //   const phoneAttributeValue = attributes.find(
  //     (value) => value.Name == 'phone'
  //   )!;
  //   const phoneAttributeVerified = attributes.find(
  //     (value) => value.Name == 'phone_verified'
  //   )!;

  //   const normalizedPhoneAttributes = {
  //     name: phoneAttributeValue['Name'],
  //     value: phoneAttributeValue['Value']!,
  //     isVerified: phoneAttributeVerified['Value']! == 'True' ? true : false
  //   };

  return [normalizedEmailAttributes, normalizedSubAttributes];
};

export const attributesToCognitoFormat = (
  attributes:
    | AttributeCognitoNormalizedType[]
    | PartialAttributeCognitoNormalizedType[]
) => {
  //   const normalizedAttributes = attributes.find
  const emailAttributeValue = attributes.find(
    (value) => value.name === "email"
  )!;
  let values: { Name: string; Value: string }[] = [];
  if (emailAttributeValue.value) {
    const attribute = {
      Name: emailAttributeValue.name,
      Value: emailAttributeValue.value
    };
    values = [attribute, ...values];
  }
  if (
    emailAttributeValue.isVerified != null ||
    emailAttributeValue.isVerified !== undefined
  ) {
    const attribute = {
      Name: "email_verified",
      Value: emailAttributeValue.isVerified ? "True" : "False"
    };
    values = [attribute, ...values];
  }

  if (!values.length) {
    throw new Error("attributes should have either name set or isVerified set");
  }

  return values;
};
