/* eslint-disable @typescript-eslint/no-shadow */
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

  console.log("normalize : ", normalizedSubAttributes);

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
  let values: { Name: string; Value: string }[] = [];

  function getAttribute(attr: string) {
    const attributeValue = attributes.find((value) => value.name === attr)!;
    if (!attributeValue) return [];
    let values: { Name: string; Value: string }[] = [];
    if (attributeValue.value) {
      const attribute = {
        Name: attributeValue.name,
        Value: attributeValue.value
      };
      values = [attribute, ...values];
      if (attr.includes("custom:")) return values;
    }
    if (
      attributeValue.isVerified != null ||
      attributeValue.isVerified !== undefined
    ) {
      const attribute = {
        Name: `${attr}_verified`,
        Value: attributeValue.isVerified ? "True" : "False"
      };
      values = [attribute, ...values];
      return values;
    }
    return [];
  }

  values = [
    ...getAttribute("email"),
    ...getAttribute("phone"),
    ...getAttribute("custom:tenant"),
    ...getAttribute("custom:role"),
    ...getAttribute("custom:owner"),
    ...getAttribute("custom:company")
  ];

  if (!values.length) {
    throw new Error("attributes should have either name set or isVerified set");
  }

  return values;
};
