import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$env/static/private';

interface ReportData {
  items: Array<{
    icon: string;
    title: string;
    kind: string;
    description: string;
  }>;
  timestamp: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data: ReportData = await request.json();

    console.log('Received report data:', data);
    console.log('Bot token:', TELEGRAM_BOT_TOKEN ? 'configured' : 'not configured');
    console.log('Chat ID:', TELEGRAM_CHAT_ID ? 'configured' : 'not configured');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram credentials not configured');
      return json({
        success: false,
        message: 'Telegram not configured',
      });
    }

    // Форматируем сообщение
    const itemsList = data.items
      .map((item) => `${item.icon} <b>${item.title}</b> (${item.kind})`)
      .join('\n');

    const message = `📋 <b>Новый отчет о выборе!</b>\n\n${itemsList}\n\n⏰ ${new Date(data.timestamp).toLocaleString('ru-RU')}`;

    console.log('Sending message to Telegram...');

    // Отправляем сообщение в Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', responseData);
      return json({
        success: false,
        message: 'Failed to send telegram message',
        error: responseData,
      });
    }

    console.log('Message sent successfully to Telegram');

    return json({
      success: true,
      message: 'Notification sent to Telegram',
    });
  } catch (error) {
    console.error('Error sending report:', error);
    return json(
      {
        success: false,
        message: 'Error sending report',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};
