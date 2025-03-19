import { NextRequest, NextResponse } from 'next/server';
import client, { admin, adminClient } from '@/utils/StorefrontInit';

const mutation = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lineItems } = body;

    const response = await client.request(mutation, {
      variables: { input: { lineItems } },
    });

    console.log("this is the response: ", response)

    // if (response.checkoutCreate.checkoutUserErrors.length > 0) {
    //   return NextResponse.json(
    //     { errors: response.checkoutCreate.checkoutUserErrors },
    //     { status: 400 }
    //   );
    // }

    return NextResponse.json({
      checkout: response //.checkoutCreate.checkout,
    });
  } catch (err: any) {
    console.error('Checkout Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
